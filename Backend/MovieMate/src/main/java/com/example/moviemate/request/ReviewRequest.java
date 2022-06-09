package com.example.moviemate.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewRequest {
    private Long movieId;
    private Long userId;
    private String reviewcode;
    private Long numberOfStars;
}
