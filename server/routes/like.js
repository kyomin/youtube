const express = require('express');
const router = express.Router();

const requestIp = require('request-ip');

const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");
const { ImageLike } = require("../models/ImageLike");
const { ImageDisLike } = require("../models/ImageDisLike");

//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
    let variable = {};

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.find(variable)
    .exec((err, likes) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
            likes
        });
    })
});


router.post('/getImageLikes', (req, res) => {
    let variable = {};

    if(req.body.imageId) {
        variable = {imageId: req.body.imageId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    ImageLike.find(variable)
    .exec((err, likes) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
            likes
        });
    })
});


router.post('/getDislikes', (req, res) => {
    let variable = {};

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    DisLike.find(variable)
    .exec((err, dislikes) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
            dislikes
        });
    })
});


router.post('/getImageDislikes', (req, res) => {
    let variable = {};

    if(req.body.imageId) {
        variable = {imageId: req.body.imageId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    ImageDisLike.find(variable)
    .exec((err, dislikes) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
            dislikes
        });
    })
});


router.post('/uplike', (req, res) => {
    console.log("/api/like/uplike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // Like collection에다가 클릭 정보를 넣어주는 작업!
    const like = new Like(variable);

    like.save((err, likeResult) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        // '좋아요' 정보 저장 성공 후 아래 작업을 진행한다.
        // 만약에 '좋아요'는 클릭이 안 되어 있는데, '싫어요'가 클릭되어 있다면
        // 싫어요에 저장된 내 정보를 좋아요 올림과 동시에 없애준다.
        DisLike.findOneAndDelete(variable)
        .exec((err, disLikeResult) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.status(200).json({
                success: true,
            });
        })
    })
});


router.post('/upImageLike', (req, res) => {
    console.log("/api/like/upImageLike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.imageId) {
        variable = {imageId: req.body.imageId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // Like collection에다가 클릭 정보를 넣어주는 작업!
    const imageLike = new ImageLike(variable);

    imageLike.save((err, likeResult) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        // '좋아요' 정보 저장 성공 후 아래 작업을 진행한다.
        // 만약에 '좋아요'는 클릭이 안 되어 있는데, '싫어요'가 클릭되어 있다면
        // 싫어요에 저장된 내 정보를 좋아요 올림과 동시에 없애준다.
        ImageDisLike.findOneAndDelete(variable)
        .exec((err, disLikeResult) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.status(200).json({
                success: true,
            });
        })
    })
});


router.post('/unlike', (req, res) => {
    console.log("/api/like/unlike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
        });
    })
});


router.post('/unImageLike', (req, res) => {
    console.log("/api/like/unImageLike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.imageId) {
        variable = {imageId: req.body.imageId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    ImageLike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
        });
    })
});


router.post('/upDislike', (req, res) => {
    console.log("/api/like/upDislike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // DisLike collection에다가 클릭 정보를 넣어주는 작업!
    const dislike = new DisLike(variable);

    dislike.save((err, dislikeResult) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        // '싫어요' 정보 저장 성공 후 아래 작업을 진행한다.
        // 만약에 '싫어요'는 클릭이 안 되어 있는데, '좋아요'가 클릭되어 있다면
        // 좋아요에 저장된 내 정보를 싫어요 올림과 동시에 없애준다.
        Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.status(200).json({
                success: true,
            });
        })
    })
});


router.post('/upImageDislike', (req, res) => {
    console.log("/api/like/upImageDislike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.imageId) {
        variable = {imageId: req.body.imageId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // DisLike collection에다가 클릭 정보를 넣어주는 작업!
    const imageDisLike = new ImageDisLike(variable);

    imageDisLike.save((err, dislikeResult) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        // '싫어요' 정보 저장 성공 후 아래 작업을 진행한다.
        // 만약에 '싫어요'는 클릭이 안 되어 있는데, '좋아요'가 클릭되어 있다면
        // 좋아요에 저장된 내 정보를 싫어요 올림과 동시에 없애준다.
        ImageLike.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.status(200).json({
                success: true,
            });
        })
    })
});


router.post('/unDislike', (req, res) => {
    console.log("/api/like/unDislike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    DisLike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
        });
    })
});


router.post('/unImageDislike', (req, res) => {
    console.log("/api/like/unImageDislike로 요청한 클라이언트 : ", requestIp.getClientIp(req));

    let variable = {};

    if(req.body.imageId) {
        variable = {imageId: req.body.imageId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    ImageDisLike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.status(200).json({
            success: true,
        });
    })
});

module.exports = router;