import gsap from "gsap";
import { useEffect, useRef } from "react";
import ListingsLoading from "../../Loading/ListingsLoading";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

const PostBody = ({ listings, loading }) => {
  const child = useRef([]);

  useEffect(() => {
    // console.log("V listings.data", listings)
    if (!listings &&  listings && listings?.length > 0) {
      if (child && child.current) {
        let tl = gsap.timeline();


        
        tl.fromTo(
          child.current,
          {
            opacity: 0,
          },
          { opacity: 1, stagger: 0.005 }
        );
      }
    }
  }, [listings]);

  
  return (
    <div>

      <ul className="flex flex-wrap ">
        {loading ? Array(3).fill("_").map(() => <ListingsLoading key={uuidv4()} />)
        :  listings && listings.map((post, i) => (
            <li
              key={post.id}
              className=" w-full sm:w-3/6 md:w-2/6 sm:px-3 px-0"
              ref={(el) => (child.current[i] = el)} >
              <Card post={post} />
            </li>
          ))
        }
      </ul>
    </div> 
  );
};

export default PostBody;
