import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tabs } from 'mesh-component-library';
import SingleInspectionForm from './singleInspection';
import BatchInspectionsForm from './batchInspections';
import Axios from 'axios';

const TabsHolder = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
`;

const fetchPermissions = async (setPermissions) => {
  try {
    const {
      data: { single, batch },
    } = await Axios.get('inspection-ordering/api/v1/permissions');
    setPermissions({ single, batch });
  } catch (e) {
    console.warn('Error requesting inspection ordering permissions');
  }
};

/* eslint-disable no-unused-vars */
const InspectionOrderingForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [permissions, setPermissions] = useState({
    single: true,
    batch: false,
  });

  useEffect(() => {
    fetchPermissions(setPermissions);
  }, []);
  
  const onSingle = () => {
    setActiveTab(0);
  };
  const onBatch = () => {
    setActiveTab(1);
  };

  return (
    <>
      <TabsHolder>
        <div style={{ width: '25rem' }}>
          <Tabs
            tabNumber={0}
            tabs={[
              {
                label: 'Single',
                id: 'Single',
                onClick: () => {
                  onSingle();
                }
              },
              {
                label: 'Batch',
                id: 'Batch',
                onClick: () => {
                  onBatch();
                }
              }
            ]}
          />
            {/* Single
          </Tabs> */}
          {/* <Tabs
            tabNumber={1}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            noBorderTop
            disabled={!permissions.batch}
            tabs={[
              {
                label: 'Batch',
                id: 'Batch',
                onClick: () => {}
              }]}
          /> */}
            {/* Batch
          </Tabs> */}
        </div>
      </TabsHolder>
      {
        {
          0: <SingleInspectionForm />,
          1: <BatchInspectionsForm />,
        }[activeTab]
      }
    </>
  );
};

export default InspectionOrderingForm;
