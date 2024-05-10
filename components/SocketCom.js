let socket=null

export function socketHandler(setConnected, data){
    socket = new WebSocket(data.url)
    socket.onopen = (event) =>{
      console.log('connected');
      setConnected(true);
      //latency 1
      let d = new Date();
      let message = {
        kpi: 'latency1',
        which: 'stamp1',
        time: d.getTime()
      };
      socket.send(JSON.stringify(
        {
          event: 'clientConnected',
          sessionId: data.sessionId,
          role: 'secondary'
        }
      ));
    
      socket.send(JSON.stringify(
        {
          event: 'message',
          sessionId: data.sessionId,
          message: JSON.stringify(message)
        }
      ));
    };
    //socket.onerror=(event)=>console.log(event)
    //socket.onclose=(event)=>console.log(event)
  
    
}

export function send(message, sessionId){
  if(socket){
    socket.send(JSON.stringify(
      {
        event: 'message',
        sessionId: sessionId,
        message: message
      }
    ));
  }
}

export function onMessage(setTrigger, sessionId){
  if(socket){
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if(data.sender == 2){
        console.log(data.message)
        if(data.message.includes('trigger'))
            setTrigger(data.message)
        else{
          //---------recieved a middle stamp----------
          let d = new Date();
          let messageToSend = {
            kpi: data.message,
            which: 'stamp2',
            time: d.getTime()
          };
          socket.send(JSON.stringify(
            {
              event: 'message',
              sessionId: sessionId,
              message: JSON.stringify(messageToSend)
            }
          ));
        }
      }
        

      // try {
      //   if ((data.event = "data")) {
      
      //         console.log(data.data);
      //       }
      //     } catch (err) {
      //       console.log(`[message] Error in recieving.`);
      //   }
    }
  }
}

export function closeConnection(setConnected){
  if(socket){
    socket.close()
    setConnected(false)
    socket=null
  }
}