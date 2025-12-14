import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SortOptions() {
    const [searchParams,ssetSearchParams]=useSearchParams();
    const handleSortChange = (e)=>{
        const sortBy =e.target.value;
        searchParams.set('sortBy',sortBy);
        ssetSearchParams(searchParams)
    }
    return (
        <>
            <div className='mb-4 flex itmes-center justify-end'>
                <select id="sort" onChange={handleSortChange} value={searchParams.get('sortBy') ||""} className='border p-2 rounded-md focus:outline-none'>
                    
                    <option value="">Default</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price:  High to  Low</option>
                    <option value="Popularity">Popularity</option>
                </select>

            </div>
        </>
    );
}

export default SortOptions;
