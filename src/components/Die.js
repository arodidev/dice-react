
export default function Die({held, hold, value, click, id}){

    const style = held ? {backgroundColor: '#1768AC'}: {backgroundColor: 'white'};
  
    return (
      <span style = {style} className='one-die' onClick={ id === 0 ? click: hold }>
         {value}
      </span>
    )
  }