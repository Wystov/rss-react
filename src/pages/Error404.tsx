import router from '../router';

const Error404 = () => {
  return (
    <div className="container-404">
      <div className="container-404-inner">
        <h1>404 :(</h1>
        <p>Sorry, but the page you were looking for does not exist.</p>
        <span>Lets go to the </span>
        <button onClick={() => router.navigate('/')}>main page</button>
      </div>
    </div>
  );
};

export default Error404;
