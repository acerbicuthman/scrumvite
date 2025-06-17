import { base_url } from '../../../library/api';
import {React, useState} from 'react'

const QuizBuilder = () => {
    const [questions, setQuestions] = useState([
        {
          question_text: "",
          question_type: "multiple_choice",
          points: 10,
          order: 1,
          explanation: "",
          options: [
            { option_text: "", is_correct: true, order: 1 },
            { option_text: "", is_correct: false, order: 2 },
            { option_text: "", is_correct: false, order: 3 },
            { option_text: "", is_correct: false, order: 4 },
          ],
        },
      ]);
      const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
      };
      
      const handleOptionChange = (questionIndex, optionIndex, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex][field] = value;
        setQuestions(updatedQuestions);
      };
      const submitQuestion = async (assignmentId, question, index) => {
        const token = localStorage.getItem("AccessToken");
      
        const payload = {
          question_text: question.question_text,
          question_type: question.question_type,
          points: 10, // default
          order: index + 1, // question order
          explanation: "", // optional
          options: question.options.map((opt, optIndex) => ({
            option_text: opt.option_text,
            is_correct: opt.is_correct,
            order: optIndex + 1, // option order
          })),
        };
      
        try {
          await axios.post(
            `${base_url}api/courses/${course_pk}/assignments/${assignment_pk}/questions/`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (err) {
          console.error("Failed to submit question", err.response?.data || err.message);
        }
      };
      
  return (
    <div className='mt-10'>
      <p className='text-2xl my-2'>Quiz Builder</p>

      <div>
        <form action="" >
            <div className='my-3'>
            <div>Question 1</div>
            <div>
            <textarea 
  className="bg-[#1C1C30] min-w-sm md:w-[448px] md:h-[56px] px-5 md:py-2 resize-none rounded-lg border border-[#363863]"
  placeholder="What was the primary cause of\nthe American Revolution?"
></textarea>
            </div>
            </div>
            <div className='my-3'>
                <div>Question Type</div>
                <div>
                    <input type="text" 
                      className="bg-[#1C1C30] min-w-sm md:w-[448px] h-[32px] px-5 py-3 rounded-lg border border-[#363863]"/>
                </div>
            </div>
            <div className='my-3'>
                <div>Option 1</div>
                <div>
                    <input type="text" 
                      className="bg-[#1C1C30] min-w-sm  md:w-[448px] h-[56px] px-5 py-3 rounded-lg border border-[#363863]"
                      placeholder='Taxation without representation'/>
                </div>
            </div>
            <div className='my-3'>
                <div>Option 2</div>
                <div>
                    <input type="text" 
                      className="bg-[#1C1C30] min-w-sm  md:w-[448px] h-[56px] px-5 py-3 rounded-lg border border-[#363863]"
                      placeholder='Religious  persecution'/>
                </div>
            </div>
            <div className='my-3'>
                <div>Option 3</div>
                <div>
                    <input type="text" 
                      className="bg-[#1C1C30] min-w-sm  md:w-[448px] h-[56px] px-5 py-3 rounded-lg border border-[#363863]"
                      placeholder='Territorial  disputes'/>
                </div>
            </div>
            <div className='my-3'>
                <div>Option 4</div>
                <div>
                    <input type="text" 
                      className="bg-[#1C1C30] min-w-sm  md:w-[448px] h-[56px] px-5 py-3 rounded-lg border border-[#363863]"
                      placeholder='Economic Competition'/>
                </div>
            </div>
            <div className='my-3'>
                <div>Correct Answer</div>
                <div>
                    <input type="text" 
                      className="bg-[#1C1C30] min-w-sm  md:w-[448px] h-[56px] px-5 py-3 rounded-lg border border-[#363863]"
                      placeholder='Taxation  without representation'/>
                </div>
            </div>
            <div className='flex flex-row-reverse mt-10'>
            <button type="submit" className='bg-[#4045E0] px-4 py-2 rounded-md'>Add Question</button>
            </div>
          
           
        </form>
      </div>
    </div>
  )
}

export default QuizBuilder
