import { useState } from 'react'
import Header from './components/Header'
import './styles.css'

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [trackingReports, setTrackingReports] = useState([]);

  const infractionMessage = "🚨🚨🚨 İHLAL TESPİT EDİLDİ! 🚨🚨🚨";

  function getTimeStamp() {
    const timeStamp = new Date();
    return (
      timeStamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }) +
      "." +
      (timeStamp.getMilliseconds() / 1000).toFixed(3).slice(-3)
    );
  }  

  


  /* Challenge 

Bu şirket çalışanlarını gözetlemek istiyor. Göreviniz aşağıdakileri yapmalarına yardımcı olmak:

    1. Kullanıcı textarea'ya her yazı yazdığında, userInput ve trackingReports state'lerinin her ikisi de güncellenmelidir. 
       
            a. userInput'un değeri, kullanıcının textarea'ya yazdığı her şeye eşit bir string olmalıdır (aşağıdaki görev 2'de tartışılan bir istisna dışında). 
            
            b. trackingReports state array için, dizide önceden var olan tüm nesneler korunmalı ve array'in sonuna yeni bir nesne eklenmelidir. 
                    
             Özellik   		 	          Değer 				  
		    	╷----------------------╷-------------------------------------------╷
		      |  timeStamp           |  getTimeStamp fonksiyonunun return değeri |
		    	|----------------------|-------------------------------------------|
		    	|  employeeInput       |  textarea'daki geçerli girdinin tümü      |
		    	|----------------------|-------------------------------------------|
		    	|  infractionDetected  |   employeeInput "Evil Corp." stringini    |
          |                      |  içeriyorsa true - aksi takdirde, false   |	
		    	¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
           
       2. Eğer kullanıcı "Evil Corp." metnini yazarsa ("title case" olarak) yazarsa, bu dize hem userInput state'inde hem de textarea'da otomatik olarak "Good Corp." ile değiştirilmelidir. 
       
    3. Metin alanına "Evil Corp. test" yazarak uygulamayı test edin. Bu görevleri doğru bir şekilde tamamlarsanız, her harf yazdığınızda bir console.log mesajı almalısınız ve mesajlar sampleOutput.md dosyasındakiler gibi olmalıdır.

       
       4. Yalnızca aşağıdaki kodu yazmanız gerekir. Yukarıdaki veya projenin başka bir yerindeki kodların hiçbirinin değiştirilmesi gerekmiyor.
*/

function findEvilCorp(reports) {
  return reports.some((report) =>
    report.employeeInput.toLowerCase().includes("evil corp.")
  );
}


  const handleClick = () => {
    let evilCorpDetected = findEvilCorp(trackingReports);
    let updatedInput = userInput;

    if (userInput.toLowerCase().includes("evil corp.")) {
      updatedInput = userInput.replace(/evil corp\./gi, "Good Corp.");
      evilCorpDetected = true;
      console.log(infractionMessage);
    }


    setUserInput(updatedInput);

  setTrackingReports([
    ...trackingReports,
    {
      timeStamp: getTimeStamp(),
      employeeInput: value,
      infractionDetected: evilCorpDetected,
    },
  ]);
};


return (
  <div>
    <textarea
      placeholder="Raporunuzu buraya yazın..."
      onChange={(e) => setUserInput(e.target.value)}
      value={userInput}
    />
   <Header trackingReports={trackingReports} />
  </div>
);
}