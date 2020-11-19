import React, { useEffect } from 'react';
import axios from 'axios';
interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = props => {
  let d_str: string = 'a_b';
  // a_b  aB
  useEffect(() => {
    d_str.replace(/_[a-z]/g, (word: string) => {
      word = word.substr(1).toUpperCase();
      return word;
    });
    axios.get('/api/connect.php').then(res => {
      console.log(res);
    });
  }, []);
  return <div className="ICU_page">ICU_page</div>;
};

export default ICUpage;
