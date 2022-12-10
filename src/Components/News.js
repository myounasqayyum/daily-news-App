import React, {useEffect, useState} from 'react'

import NItem from './NItem'
import Spiner from './Spiner';

import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=>  {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResult] = useState(0)
  
 
      const capitalize=(s)=>
      {
        return s[0].toUpperCase() + s.slice(1);
      }
   
   
    const UpdateNews = async  ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0465ad20a2e4407ab7030c30efce1fe0&page=${page}&pageSize=${props.pageSize}`;
        
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)
       

        props.setProgress(100);

    }
    useEffect(() => {
      return () => {
        document.title=`${capitalize(props.category)} - Daily News`;
        UpdateNews();
        // eslint-disable-next-line
      };
    }, [])
  

    

    const fetchMoreData = async () => {
      
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0465ad20a2e4407ab7030c30efce1fe0&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResult(parsedData.totalResults)
      

      
    };
  
    return (
      <>
            <h1 className="text-center" style={{marginTop:'90px'}}>Daily news  -  Top Headlines</h1>
            {loading &&<Spiner/>}
          <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length!==totalResults}
              loader={<Spiner/>}
          >
            <div className='container'>
              <div className="row">
                  {articles.map((element)=>{
                      return <div className="col-md-4" key={element.url}>
                      <NItem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div> })}
              </div>
            </div>
          </InfiniteScroll>
                
                    
                
        </>
        
    )
  
}



News.defaultProps = {
  pageSize : 9 ,
  country : "us",
  category: 'general'
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string

}

export default News
