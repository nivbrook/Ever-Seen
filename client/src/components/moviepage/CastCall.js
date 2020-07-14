import React from 'react';
import { Link } from 'react-router-dom'
import Morley from './morley.jpg';

export default props => {
    const { credits } = props;
    const cast = credits.cast.slice(0,9);

    return (
        <div style={{display: 'flex'}}>
            {cast.map((actor,idx) =>{
                return(
                <div style={{width: '150px', height: '240px', margin: '0px 10px', backgroundColor: 'rgba(0,0,0,0.5)'}} key={idx}>
                        <div>
                            { actor.profile_path
                                ?   <img 
                                    src={"https://image.tmdb.org/t/p/w500/"+actor.profile_path}
                                    height="200px"
                                    width="150px"
                                    />
                                :   <img 
                                    src={Morley}
                                    height="200px"
                                    width="150px"
                                    />
                            }
                        </div>
                        <div style={{textAlign: 'center', color: 'white'}}>
                            <h6>
                                <Link to={'/people/' + actor.id}>{actor.name}</Link>
                            </h6>
                            { actor.character
                                ? <h8>{actor.character}</h8>
                                : <h8>Unspecified</h8>
                            }
                        </div>
                </div>)
            })}
        </div>
    )
}