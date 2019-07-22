import React from 'react';
import './App.scss';

console.log = () => {}

const MasonryHeader = props =>
  <div className="masonry-header">{props.title}
    <span className="masonry-header-sub">{props.sub}</span>
  </div>;

const MasonryItem = props => {
  const getBkColor = diffHrs => {
    if (diffHrs <= 3) {
      return `rgba(231, 76, 60, ${.4+.6*(3-diffHrs)/3})`
    } else if (diffHrs <= 6) {
      return `rgba(0, 100, 0, .6)`
    } else if (diffHrs <= 12) {
      return `rgba(0, 0, 100, .6)`
    } else {
      return `rgba(0, 0, 0, .6)`
    }
  };
  const mon_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dt = new Date(props.publishedAt);
  const lZ = n => (n < 10) ? '0' + n : n.toString();
  const bgc = getBkColor(Math.ceil(( Date.now() - dt.getTime() ) / (1000 * 60 * 60)));
  const mo_dd = (props.en ? (mon_name[dt.getMonth()] + ' ') : ((dt.getMonth()+1) + '/') ) + dt.getDate();

  return (
    <div className="masonry-item">
      <div className="masonry-content">
        <div className="masonry-img">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <div className="date-stamp" style={{backgroundColor: bgc}}>
              <div className="date-hh-mm">{lZ(dt.getHours()) + ':' + lZ(dt.getMinutes())}</div>
              <div className="date-mo-dd">{mo_dd}</div>
            </div>
            <img src={props.urlToImage} alt="" />
          </a>
        </div>
        <div className="masonry-text">
          <h3 className="masonry-title">
            {props.source.name &&
              <div className="masonry-nb tooltip">{props.source.name}
                {props.author && <span className="tooltiptext">{props.author}</span>}
              </div>}
            {props.title}
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
              'apiKey=2df259c96a4b405fbb75e14986f3c1f5'; //  fd3137543cde4878a4ab77aebe5bc94c
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

  const FLAGS = ["gb", "fr", "de", "in", "sg", "cn", "kr", "jp", "au", "us", "ca"];

  const CBtn = props => {
    const flag = {
      "gb": "🇬🇧",
      "fr": "🇫🇷",
      "de": "🇩🇪",
      "in": "🇮🇳",
      "sg": "🇸🇬",
      "cn": "🇨🇳",
      "kr": "🇰🇷",
      "jp": "🇯🇵",
      "au": "🇦🇺",
      "us": "🇺🇸",
      "ca": "🇨🇦"
    };
    const style = (props.co === country) ? {background: "Khaki"} : undefined;
    return <button type="button"
                   onClick={()=>setCountry(props.co)}
                   className="btn-ctr"
                   style={style}
                 >
        <span role="img" aria-label={props.co}>{flag[props.co]}</span>
      </button>;
  }
  // disabled={country === props.co}

  const isWestern = !["ch", "kr", "jp"].includes(country);

  return (contents &&
    <div className="App">
      <div className="btn-cont">
        <MasonryHeader title="NEWS" sub="" />
        {FLAGS.map( (co, i) => <CBtn key={i} co={co} />)}
      </div>
      <div className="masonry-wrapper">
        <div className="masonry">
          { contents.articles.map((cts, i) => <MasonryItem key={i} en={isWestern} {...cts} /> ) }
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
