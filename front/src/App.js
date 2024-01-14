import './App.css';

function App() {
  return (
    <h1
      className='App'
      onClick={async () => {
        const test = await fetch(
          'http://localhost:8080/products/65a3156572d518107fc2aa26',
          {
            method: 'get',
          }
        );
        const response = await test.json();
        console.log(response.body);
        return response.body;
      }}
    >
      Click me
    </h1>
  );
}

export default App;
