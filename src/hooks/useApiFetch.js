import {useEffect, useState} from "react";

const useApiFetch = (ds, first = true) => {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   useEffect(() => {
       (async () => {
           const load = await ds.load();
           setData(first ? load[0] : load);
           setLoading(false);
       })();
   }, [])
   return [data, loading]
};

export default useApiFetch;
