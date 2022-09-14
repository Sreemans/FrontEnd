import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const useOrderBatchInspections = (rows) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setOrders([]);
    setStatus(null);
    setTotal(rows.length);
    setCurrent(0);
  }, [rows]);

  const orderBatchInspections = useCallback(async () => {
    setLoading(true);

    /**
     * Each browser may have a different number of max web requests,
     * but as long as we don't queue too many at a time, we're fine
     */
    const NUM_ORDER_THREADS = 6;
    const completedOrders = [];
    const orderGenerator = (function* yieldRow() {
      yield* rows;
    })();

    // Set up "threads" to process orders
    const orderThreads = Array.from(new Array(NUM_ORDER_THREADS)).map(() =>
      (async () => {
        let { value: order, done } = orderGenerator.next();
        while (!done) {
          // eslint-disable-next-line no-await-in-loop
          const response = (await orderInspection(order)) || { status: 500 };
          completedOrders.push({
            order,
            response,
            status: response.status,
          });
          setCurrent((prev) => prev + 1);
          ({ value: order, done } = orderGenerator.next());
        }
      })(),
    );

    await Promise.all(orderThreads);

    setOrders(completedOrders);
    setStatus(
      completedOrders.some((o) => o.status && o.status !== 200)
        ? 'error'
        : 'success',
    );
    setLoading(false);
  }, [rows]);

  // Why are `current` and `total` coupled into an array? Who knows! Seems like a cool idea
  return [orderBatchInspections, orders, loading, status, [current, total]];
};

export const orderInspection = async (singleInspectionOrder) => {
  try {
    return await axios
      .post(
        'inspection-ordering/api/v1/order/single',
        { ...singleInspectionOrder },
        { validateStatus: (s) => s === 200, timeout: 15000 },
      )
      .catch((e) => e.response);
  } catch (e) {
    return { status: 500 };
  }
};
