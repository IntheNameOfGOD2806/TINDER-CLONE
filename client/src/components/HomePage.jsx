import UserCard from "./UserCard/UserCard";


const HomePage = () => {

  return (
     <div className="home-container w-full h-full flex items-center justify-center" >
      <div className="min-w-96  min-h-96">
        <UserCard />
      </div>
     </div>
   
  );
};

HomePage.propTypes = {};

export default HomePage;
