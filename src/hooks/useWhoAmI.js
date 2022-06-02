import {useSelector} from "react-redux";

const useWhoAmI = () => {
    return useSelector(state => state.auth.whoAmi);
};

export default useWhoAmI;
