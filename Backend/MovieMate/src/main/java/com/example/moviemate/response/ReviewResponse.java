package com.example.moviemate.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewResponse {
    private Long movieId;
    private Long userId;
    private String reviewcode;
    private Long numberOfStars;
    public ReviewResponse(){}
    public ReviewResponse(Long movieId, Long userId, String reviewcode, Long numberOfStars) {
        this.movieId = movieId;
        this.userId = userId;
        this.reviewcode = reviewcode;
        this.numberOfStars = numberOfStars;
    }
}
