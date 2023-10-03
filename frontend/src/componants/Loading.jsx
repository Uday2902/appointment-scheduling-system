import React from 'react'
import { Vortex } from 'react-loader-spinner'

function Loading() {
  return (
    <div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['#ed2690', '#000032', '#ed2690', '#000032', '#000032', '#ed2690']}
            />
        </div>
    </div>
  )
}

export default Loading
