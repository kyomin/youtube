import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Row, Col, Card, Icon, Avatar, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

import * as constants from '../../Config';

const {Title} = Typography;
const {Meta} = Card;

function SubscriptionPage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {

        const subscriptionVariables = {
            userFrom: localStorage.getItem('userId')
        };

        axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
        .then(response => {
            if(response.data.success) {
                setVideos(response.data.videos);
            } else {
                alert('비디오 가져오기를 실패 했습니다.');
            }
        });
    }, []);

    const renderCards = videos.map((video, idx) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor( (video.duration - minutes*60) );

        if(video.writer) {
            // Col : xs 24사이즈가 전체 윈도우 사이즈이다. lg는 가장 큰 사이즈이므로 화면이 가득 차면 4개가 들어간다.
            return <Col key={idx} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/video/${video._id}`}>
                        <img 
                            style={{
                                width: '100%'
                            }}
                            src={`${constants.URL_BACK}/${video.thumbnail}`}
                            alt='thumbnail'
                        />
                        <div className="duration">
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div>
                <br/>
                <Meta
                    avatar={
                        <Avatar src={video.writer.image}/>
                    }
                    title={video.title}
                    description=""
                />
                <span>{video.writer.name}</span><br/>
                <span style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
        } else {
            return (
                <div>...loading</div>
            );
        }
    });

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2} style={{ color: '#1890ff' }}> Subscription </Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    );
}

export default SubscriptionPage