import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import home from "../pages/home";

function AboutPlanetsPage({ planet, p_id }) {
  const { store, actions } = React.useContext(Context);
  const params = useParams();
  let p = actions.getPlanets(parseInt(params.key));

  return (
    <div className="ACP-page">
      <h1>{p.name}</h1>
      <div className="ACP-container">
        <img
          className=""
          src="https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc4MzAwMjIwNTk2MDM3MjI5/german-shepherd-puppy-bite-inhibition-games.jpg"
          alt="aCrd image cap"
        />
        <p>
          Bacon ipsum dolor amet corned beef salami andouille short loin bacon
          picanha meatball. Short loin buffalo chuck pastrami. Leberkas tongue
          brisket pork belly spare ribs beef ribs chicken sirloin ball tip
          shoulder. Pork frankfurter tail jowl shankle corned beef beef sausage
          turkey t-bone beef ribs ball tip flank. Andouille ribeye hamburger,
          brisket kielbasa tenderloin shoulder bacon filet mignon tri-tip.
          Tri-tip tenderloin pork belly short ribs. Tail flank pork chop, jerky
          jowl bresaola doner swine spare ribs corned beef tongue turducken
          prosciutto short loin strip steak. Meatloaf porchetta rump flank,
          venison pig salami corned beef. Shankle bacon ball tip meatloaf
          picanha chislic prosciutto meatball. Tenderloin pastrami beef ribs
          bresaola, pancetta pork loin salami capicola. Beef bacon ham chislic.
          Picanha chislic ball tip, chicken drumstick shankle landjaeger brisket
          short loin short ribs. Cow ground round capicola, swine sausage
          tenderloin sirloin ham hock drumstick alcatra leberkas pork loin
          pastrami tongue tri-tip.
        </p>
       
      </div>

      <Link to="/">
        <span className="btn btn-primary">Go Back</span>
      </Link>
    </div>
  );
}

export default AboutPlanetsPage;
