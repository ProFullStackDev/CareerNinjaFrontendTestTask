import * as types from '../../types';
export const handleLoader = (loading) => {
  console.log(loading, 'this is loading ++++++');
  return {
    type: types.LOADING,
    payload: loading,
  };
};

