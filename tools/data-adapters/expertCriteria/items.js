import itemAdapter from './item';
export default (data) => {
  return data.map((item) => itemAdapter(item));
};
