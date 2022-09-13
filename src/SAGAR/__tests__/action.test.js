// https://react-hooks-testing-library.com/reference/api
import { renderHook, cleanup, act } from '@testing-library/react-hooks'
import { useSearchPolicyAction } from '../actionpolicy'

describe('testing policy action hook', ()=>{
    test('should use counter', () => {
        const { result } = renderHook(() => useSearchPolicyAction())
      
        // expect(result.current.count).toBe(0)
        // expect(typeof result.current.increment).toBe('function')
      })
})