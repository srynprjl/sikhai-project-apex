import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router";
import api from "../../api";
import { useState, useEffect } from "react";

export default function ViewSuggestions() {
    const [count, setCount] = useState(0)
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
    async function getUserInfo() {
        const res = await api.get("/api/user/");
            if(!res.data.is_superuser){
            navigate("/forbidden")
         }
        }
    getUserInfo();

    async function getFeedbacks() {
      const res = await api.get("/api/feedback/");
      setFeedbacks(res.data)
    }
    getFeedbacks()
  }, [])

  function updateFeedbacks(id){

  }

  function deleteFeedbacks(id){

  }

  const feedbackLists = feedbacks.map((data) => {
    return <AdminContainer key={data.id} id={data.id} title={data.name} updateSrc={() => updateFeedbacks(data.id)} deleteSrc={() => deleteFeedbacks(data.id)}></AdminContainer>
  })

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="feedbacks" count={0}>
          {feedbackLists}
        </AdminView>
      </DashboardLayout>
    </>
  );
}
