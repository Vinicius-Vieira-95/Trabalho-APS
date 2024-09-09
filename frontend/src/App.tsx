// App.tsx  
import AppRouter from './Routes'; 
import { AuthProvider } from './context/AuthProvider'; 

function App() {  
  return (  
    <AuthProvider> 
      <AppRouter />  
    </AuthProvider>  
  );  
}  

export default App;