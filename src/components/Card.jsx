import React, { useEffect, useRef, useState } from 'react'
import { useDispatchcart, useCart } from './ContextReducer';
const Card = (props) => {

    let dispatch = useDispatchcart();
    let options = props.options;
    const priceref = useRef();
    let priceoptions = Object.keys(options);
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    let data = useCart();
    // let fooditem=props.fooditems;
    const handleaddtocart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodname._id) {
                food = item;

                break;
            }
        }
        // if (food !== []) {
        //     if (food.size===size) {
        //         await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalprice, qty: qty })
        //         return;
        //     }

        //     else if (food.size !== size) {
        //         await dispatch({ type: "ADD", id: props.foodname._id, payload: fooditemwithqty, qty: qty, size: size, price: finalprice })
        //         return;
        //     }
        //     return;
        // }

        let fooditem = props.foodname;
        let fooditemwithqty = { ...fooditem, qty: qty, size: size }
        console.log(fooditemwithqty)
        await dispatch({ type: "ADD", id: props.foodname._id,name:props.name ,payload: fooditemwithqty, qty: qty, size: size, price: finalprice })
        console.log(data)
    }
    // console.log(props.foodname)
    let finalprice = qty * parseInt(options[size]);
    useEffect(() => {
        setsize(priceref.current.value)
    }, [])

    return (
        <>

            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodname.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodname.name}</h5>

                        <div className="container w-100">
                            <select className='m-2 h-100 bg-success rounded' name="" id="" onChange={(e) => { setqty(e.target.value) }}>
                                {Array.from(Array(6), (e, i) => {
                                    return <option key={i + 1} value={i + 1}>{i}</option>
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded' ref={priceref} onChange={(e) => { setsize(e.target.value) }}>
                                {priceoptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </select>
                            <div className='d-inline h-100'>
                                ₹ {finalprice}/-
                            </div>
                        </div>
                        <button className="btn btn-success justify-center ms-2" onClick={handleaddtocart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card