import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./Newsitem.jsx";  
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({country='us',pageSize=8,category='general',setprogress}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchNews = async () => {
        setprogress(10);
       
        const apiKey = "359388747a9d4dc3bf8bbe3481ed3abb";
        
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
        
        setLoading(true);

        try {
            let response = await fetch(url);
            setprogress(50);
            let parsedData = await response.json();
            console.log("API Response:", parsedData);  
            setprogress(75);
            
            if (parsedData.status === "ok") {
                setArticles((prevArticles) =>{ 
                    const uinqueArticle=[...prevArticles, ...parsedData.articles ].filter(
                    (articles,index,self)=>index===self.findIndex((a)=>a.url===articles.url)
                )
                return uinqueArticle;
            });
                setTotalResults(parsedData.totalResults);
             
                setLoading(false);
                setprogress(100);
            } else {
                setArticles([]);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setArticles([]);
            setLoading(false);
        }
    };

    useEffect(() => {
      console.log("Fetching news on page:", page);  // ✅ Debugging
      fetchNews();
  }, [page]); 
  // Fetch news when page updates

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            <div className="container my-3">
                <h2 className="text-center m-3">
                    News - Top {category} Headlines
                </h2>

               <p className="text-center m-5">{loading && <Spinner />} </p>{/* Show spinner when loading */}

                <div className="container text-center">
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length < totalResults}
                        loader={<Spinner />}
                    >
                        <div className="row">
                            {articles.length > 0 ? (
                                articles.map((element, index) => (
                                    <div className="col-md-3" key={index}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 50) : "No Title"}
                                            description={element.description ? element.description.slice(0, 100) : "No Description"}
                                            imageurl={element.urlToImage}
                                            newsurl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                ))
                            ) : (
                                !loading && <h4 className="text-center">No News Found</h4>
                            )}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setprogress: PropTypes.func,
};

export default News;
