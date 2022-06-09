package com.example.moviemate.repository;

import com.example.moviemate.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByUserIdAndMovieId(Long userId, Long movieId);
}
