import React from 'react'

// export default function Main(props) {
//     const { data } = props
//     return (
//         <div className="imgContainer">
//             <img src={data.hdurl} alt={data.title || 'bg-img'} className="bgImage" />
//         </div>
//     )
// }

export default function Main({ data }) {
    const renderMedia = () => {
        if (!data) return null;

        if (data.media_type === 'other') {
            return (
                <img 
                    src="/mars.png"  
                    alt="Mars Fallback Image" 
                    className="bgImage"
                />
            );
        }

        return (
            <img 
                src={data.url || data.hdurl} 
                alt={data.title} 
                className="bgImage"
            />
        );
    };

    return (
        <div className="imgContainer">
            {renderMedia()}
        </div>
    );
}