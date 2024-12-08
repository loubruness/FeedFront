import { useRouter } from 'next/navigation';
import { useState } from "react";

export const useFeedbackForm = () => {  

  const router = useRouter();

  const [verified, setVerified] = useState<boolean>(false);

  
  const verifyToken = async (tokenForm: string): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (tokenForm) {
      try {
        const response : Response = await fetch(`http://localhost:3001/email/verifyTokenForm?token=${tokenForm}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();        
        console.log(data);
        if(response.ok){
          console.log("ok");
          return true;
        }
        return false;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert(`Failed to identify student. Redirecting to dashboard`);
        router.push("./Dashboard");
        return false;
      }
    }
    return false;
  }


  return {
    verified,
    setVerified,
    verifyToken,
  };
};
