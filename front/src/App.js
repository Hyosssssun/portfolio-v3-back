import './App.css';

function App() {
  const handleClick = async () => {
    const test = await fetch('http://localhost:8080');
    const response = await test.json();
    console.log(response.body);
    return response.body;
  };
  return (
    <h1 className='App' onClick={() => handleClick()}>
      Click me
    </h1>
  );
}

export default App;
