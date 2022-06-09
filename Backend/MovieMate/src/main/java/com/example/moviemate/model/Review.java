package com.example.moviemate.model;

import com.example.moviemate.request.ReviewRequest;
import com.example.moviemate.response.ReviewResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name="review")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String reviewcode;
    private Long numberOfStars;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Movie movie;

    public Review(){}
    public Review(User user, Movie movie, String reviewcode, Long numberOfStars){
        this.user = user;
        this.movie = movie;
        this.reviewcode = reviewcode;
        this.numberOfStars = numberOfStars;
        this.id = null;
    }
    public ReviewResponse convertToResponse(){
        return new ReviewResponse(movie.getId(), user.getId(), reviewcode, numberOfStars);
    }
}
