export default function LocalToken(key){
    if (typeof window !== 'undefined' && localStorage) {
      const item = localStorage.getItem(key);
      return item;
    }
    return null;
};