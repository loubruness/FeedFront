import { useRouter } from 'next/navigation';
import { useState } from "react";

export const useFeedbackForm = () => {  

  const router = useRouter();

  const [verified, setVerified] = useState<boolean>(false);

  
  const verifyToken = async (tokenForm: string): Promise<boolean> => {
    if (tokenForm) {
      try {
        const data: boolean = await verifyToken(tokenForm);
        console.log(data);
        return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert(`Failed to identify student. Redirecting to dashboard`);
        router.push("./FeedbackSystem");
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
