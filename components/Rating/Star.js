import React from 'react';
import StarRating from 'react-native-star-rating';

export default function Star({ rating, size }) {

    return (
        <StarRating
            disabled={true}
            maxStars={5}
            rating={rating}
            emptyStarColor={'white'}
            fullStarColor={'white'}
            fullStar={'ios-star-sharp'}
            halfStar={'ios-star-half-sharp'}
            emptyStar={'ios-star-outline'}
            halfStarColor={'white'}
            iconSet={'Ionicons'}
            starSize={size}
            containerStyle={{justifyContent: 'flex-end', alignItems: 'center'}}
        />
    )
}