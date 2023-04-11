
export default function Die({held, hold, value}){
    const style = held? {backgroundColor: '#1768AC'}: {backgroundColor: 'white'};

    return (
      <span style = {style} className='one-die' onClick={hold}>
         {value}
      </span>
    )
  }