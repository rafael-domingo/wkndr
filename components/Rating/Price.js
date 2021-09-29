import React from 'react';
import StarRating from 'react-native-star-rating';

export default function Price({ rating, size }) {
    
    return (
        <StarRating
        disabled={true}
        maxStars={4}
        rating={rating.length}
        emptyStarColor={'white'}
        fullStarColor={'white'}
        fullStar={'cash-usd'}
        halfStar={'ios-star-half-sharp'}
        emptyStar={'cash-usd-outline'}
        halfStarColor={'white'}
        halfStarEnabled={false}
        iconSet={'MaterialCommunityIcons'}
        starSize={size}
        containerStyle={{justifyContent: 'flex-end', alignItems: 'center'}}
    />
    )
}