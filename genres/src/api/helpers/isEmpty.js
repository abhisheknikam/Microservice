const isEmpty = val => val == null || !(Object.keys(val) || val).length;
export default isEmpty;
