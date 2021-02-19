import React, { useEffect } from 'react';
import axios from 'axios';
import { useRequest } from 'ahooks';
interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = props => {
  function getUsername(): Promise<string> {
    return new Promise(resolve => {
      axios.get('https://randomuser.me/api').then(res => {
        resolve(res.data.results[0].phone);
      });
    });
  }
  useEffect(() => {
    axios.get('https://randomuser.me/api').then(res => {
      console.log(res.data.results[0].phone);
    });
  }, []);
  const { data, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 3000,
    pollingWhenHidden: false,
  });

  return (
    <div className="ICU_page">
      <p>Username: {loading ? 'loading' : data}</p>asdfasd
    </div>
  );
};

export default ICUpage;
