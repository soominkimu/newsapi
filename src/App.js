import React from 'react';
import './App.scss';

const MasonryHeader = props =>
  <div className="masonry-header">{props.title}
    <span className="masonry-header-sub">{props.sub}</span>
  </div>;

const MasonryItem = props => {
  const getBkColor    = diffDays => {
    if (diffDays <= 30) {
      return `rgba(231, 76, 60, ${.4+.6*(30-diffDays)/30})`
    } else if (diffDays <= 366/2) {
      return `rgba(0, 100, 0, .6)`
    } else if (diffDays <= 366) {
      return `rgba(0, 0, 100, .6)`
    } else {
      return `rgba(0, 0, 0, .6)`
    }
  };
  const mon_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dt = new Date(props.publishedAt);
  const diffDays = Math.ceil(( Date.now() - dt.getTime() ) / (1000 * 60 * 60 * 24));
  let bgc = getBkColor(diffDays);

  return (
    <div className="masonry-item">
      <div className="masonry-content">
        <div className="masonry-img">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <div className="date-stamp" style={{backgroundColor: bgc}}>
              <div className="date-mon-dd">{mon_name[dt.getMonth()] + '.' + dt.getDate()}</div>
              <div className="date-year">{dt.getFullYear()}</div>
            </div>
            <img src={props.urlToImage} alt="" />
          </a>
        </div>
        <div className="masonry-text">
          <h3 className="masonry-title">{props.title}
            {props.author && <span className="masonry-nb">{props.author}</span>}
          </h3>
          <p className="masonry-description">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

// ES2018 property spread notation {...props}
const App = () => {
  //console.log(id, "items");
  const [contents, setContents] = React.useState(null);
  const [country,  setCountry]  = React.useState('us');

  React.useEffect(() => {
    const url = 'https://newsapi.org/v2/top-headlines?' +
              'country=' + country + '&' +
              'apiKey=fd3137543cde4878a4ab77aebe5bc94c';
    const req = new Request(url);
    fetch(req)
      .then(response => {
        return response.json();
      })
      .then(setContents)
      .catch(() => console.error("fetch error!"));
  }, [country]);

  if (contents)
    console.log(contents);

  const CBtn = props => {
    const flag = {
      "us": "🇺🇸",
      "ca": "🇨🇦",
      "jp": "🇯🇵",
      "kr": "🇰🇷",
      "ch": "🇨🇳",
      "fr": "🇫🇷",
      "de": "🇩🇪",
    };
    return <button type="button"
      disabled={country === props.co}
      onClick={()=>setCountry(props.co)}
      className="btn-ctr"><span role="img" aria-label={props.co}>{flag[props.co]}</span></button>;
  }

  return (contents &&
    <div className="App">
      <div className="btn-cont">
        <MasonryHeader title="World News" sub="" />
        <CBtn co="fr" />
        <CBtn co="de" />
        <CBtn co="ch" />
        <CBtn co="kr" />
        <CBtn co="jp" />
        <CBtn co="us" />
        <CBtn co="ca" />
      </div>
      <div className="masonry-wrapper">
        <div className="masonry">
          { contents.articles.map((cts, i) => <MasonryItem key = {i} {...cts} /> ) }
        </div>
      </div>
    </div>
  );
}

export default App;
/*
 *
    const url = 'https://newsapi.org/v2/everything?' + // top-headlines?' +
              'q=market&' + //'country=jp&' +
              'apiKey=fd3137543cde4878a4ab77aebe5bc94c';
*/
