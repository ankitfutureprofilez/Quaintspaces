// components/ErrorPage.js

import { useRouter } from "next/router";

const NoRecord = ({heading, content}) => {
    const router =useRouter();
    return (
      <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAACuCAMAAACFrPhHAAAC9FBMVEUAAADn6do3tE7l5ufo6ejl7vLs8fPd6e3woX/o2WoutEz/0Ug1Lj7e3t3s7e0e1VAX1lL/41Hl5eUQykrj5eWm8l+o5Vzs7Ow6NUcM0FAM21dG41Q6OT2O7lz135YEtz8B2Vgm31EJ21jh5OTnw3A4MUTE92IBuEM44lMojErg4OACuUKI7VsBsTM/41Sm81/i4+PF+GLg4+PU82OG7VvW9mFs6Vjq7Oz411rNmoCin6bj4dbz3pP643zR0tHk/KG5uLvn6e7////8/fzp+v/u/P/4/v/z/f/k+f/k5OT/Yhu79mHZ2dmR8Fzc3d3G+GKi8l7r6+yp9F/f39+a8V1/7VpM5VV261n/301Z51b/2ktk6VjA+GHQ+mOw9V+19mCI71v/4lDm5ubi4uFVT2Xw8PDK+WL09PL/wkH/1Un/uz474lP/yUX/WQ3/cltu61n/0EbW1tYA21rU+2QByVJOR1/S09PFxcZfVmkA1FcA4lz/bWD/dlfZ/GX/kSsBrTD9yldEPVX/Z2X/tTv+qzn/9eQ2L0UBwk8Aszr/448Bz1T/4oMAt0L/Ymr/z14r4FH/mTL/iSpJQlr/ojY+OFD/sjL/gSn/rCfqrDba4+b/76v/7KP/6JkEvE3Kysr/oiC4t7f/1Gr/230OnD3BwsL/mSb8w07/2HP942H/yj04MzL5+fm8vLxLw1uJiYn/oiz/uzL7/PHegVYNqEjPz82rqKeRkZH/eCQRn0fuvEN/f3+nsbbf1M3/wTn/bh4uKCn/3kToUj35VmFbylwLskz9hF+R515JPzTttDsVj0J2dHFqaWmf6V+xsK+U0lGgoKDvYEml11KCzE5gwk3/7t5IuUr+5eTo3trYnjfumzTyfi3f32FpVjbyaSP/cnKwur/kh1xl2Fs6u1orsUbb+pLt7Vnu47Qjl0nDlTlfXFvwWFCrhDnv9/Tz78xyx06YdznW+mq53lSCZzfktUOwlEnR5pfgs1hRUFBDmUTTwq79m57P8XpxWfaWAAAAQnRSTlMABAR+/vlX/vMRGeo/imoyY1GkSS1OLYq0hquPb6L5qurl1Ej93IbwwvfhyG7r4ta72pn12q/QxKz72smTYeGxsKmDcPDbAAAXwklEQVR42tyXv4vTUADHk1iVVrT1RwtaWjgPpIhUxZ8gCl6nYI3Wtja29yNNUZAbDjno1tGpw811dLFLBneHwIGTe+cUzOb/4DeNyUvbF70+n5D4uR4luRLeh8/70ROOhOSwcC38H/gmUiqVSuM3+es6/oauQSqdyZdK5VcOnU7n7t3CtWxOirmgNBNI50vllw6uHNjb22u1lGJrViqc87Dg8vK/RaB1+2jvZvZs1Zvk5b2OfEwLaYTDdfGip5e3jAOMvSTahUql2a1NTY2+R8H+mbL5SBElJgZYWZmO7MnJyRuXl4J0RB4ERHhQeOjo5CcmBk5ubk5d/LCwvIyMhg0iXl5eDR0enp6dRkZGByMgIqFStCgiIcOXKFAUFCTy8vL29vb29jz5495ebmRnZ2doaWlpbm5uampra2trc3NzW1tbT09PW1tbU1NTV1dXV1dXX19fX19vb29/f3+Pj4+fn5+vr6+/v7+/z8/Pz9/f3+/v7+////5o6HVwUhgYtCvAAAADUlEQVQI12PAAQMCLgABfwG+T3FAAAAAElFTkSuQmCC"
            alt="No data"
          />
        </div>
        <div className="empty-state__message">
          {heading} available. Please try again later.
        </div>
        <button onClick={() => { router.push("/admin") }} className="sm:w-full lg:w-auto my-2 filter btn">
          Take me there!
        </button>
      </div>
    </div>
    
                  
              
      );
  };
  
  export default NoRecord;
  