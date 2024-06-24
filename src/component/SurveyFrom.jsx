import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as z from 'zod';

const surveySchema = z.object({
  fullName: z.string().nonempty({ message: 'Full Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }).nonempty({ message: 'Email is required' }),
  surveyTopic: z.string().nonempty({ message: 'Survey Topic is required' }),
  favoriteProgrammingLanguage: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  exerciseFrequency: z.string().optional(),
  dietPreference: z.string().optional(),
  highestQualification: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  feedback: z.string().min(50, { message: 'Feedback must be at least 50 characters long' }),
});

const SurveyForm = () => {
  const [surveyTopic, setSurveyTopic] = useState('');
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(surveySchema),
  });

  const watchSurveyTopic = watch('surveyTopic');

  useEffect(() => {
    if (watchSurveyTopic) {
      fetchAdditionalQuestions(watchSurveyTopic);
    }
  }, [watchSurveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get('/survey-questions.json');
      setAdditionalQuestions(response.data[topic]?.questions || []);
    } catch (error) {
      console.error('Error fetching additional questions', error);
    }
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <input {...field} className="mt-1 p-2 w-full border rounded-md" />
            )}
          />
          {errors.fullName && <div className="text-red-500 text-sm">{errors.fullName.message}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input {...field} className="mt-1 p-2 w-full border rounded-md" />
            )}
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Survey Topic</label>
          <Controller
            name="surveyTopic"
            control={control}
            render={({ field }) => (
              <select {...field} className="mt-1 p-2 w-full border rounded-md" onChange={(e) => {
                setSurveyTopic(e.target.value);
                setValue('surveyTopic', e.target.value);
              }}>
                <option value="" label="Select topic" />
                <option value="Technology" label="Technology" />
                <option value="Health" label="Health" />
                <option value="Education" label="Education" />
              </select>
            )}
          />
          {errors.surveyTopic && <div className="text-red-500 text-sm">{errors.surveyTopic.message}</div>}
        </div>

        {surveyTopic === 'Technology' && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Favorite Programming Language</label>
              <Controller
                name="favoriteProgrammingLanguage"
                control={control}
                render={({ field }) => (
                  <select {...field} className="mt-1 p-2 w-full border rounded-md">
                    <option value="" label="Select language" />
                    <option value="JavaScript" label="JavaScript" />
                    <option value="Python" label="Python" />
                    <option value="Java" label="Java" />
                    <option value="C#" label="C#" />
                  </select>
                )}
              />
              {errors.favoriteProgrammingLanguage && <div className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage.message}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Years of Experience</label>
              <Controller
                name="yearsOfExperience"
                control={control}
                render={({ field }) => (
                  <input type="number" {...field} className="mt-1 p-2 w-full border rounded-md" />
                )}
              />
              {errors.yearsOfExperience && <div className="text-red-500 text-sm">{errors.yearsOfExperience.message}</div>}
            </div>
          </div>
        )}

        {surveyTopic === 'Health' && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Exercise Frequency</label>
              <Controller
                name="exerciseFrequency"
                control={control}
                render={({ field }) => (
                  <select {...field} className="mt-1 p-2 w-full border rounded-md">
                    <option value="" label="Select frequency" />
                    <option value="Daily" label="Daily" />
                    <option value="Weekly" label="Weekly" />
                    <option value="Monthly" label="Monthly" />
                    <option value="Rarely" label="Rarely" />
                  </select>
                )}
              />
              {errors.exerciseFrequency && <div className="text-red-500 text-sm">{errors.exerciseFrequency.message}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Diet Preference</label>
              <Controller
                name="dietPreference"
                control={control}
                render={({ field }) => (
                  <select {...field} className="mt-1 p-2 w-full border rounded-md">
                    <option value="" label="Select diet" />
                    <option value="Vegetarian" label="Vegetarian" />
                    <option value="Vegan" label="Vegan" />
                    <option value="Non-Vegetarian" label="Non-Vegetarian" />
                  </select>
                )}
              />
              {errors.dietPreference && <div className="text-red-500 text-sm">{errors.dietPreference.message}</div>}
            </div>
          </div>
        )}

        {surveyTopic === 'Education' && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Highest Qualification</label>
              <Controller
                name="highestQualification"
                control={control}
                render={({ field }) => (
                  <select {...field} className="mt-1 p-2 w-full border rounded-md">
                    <option value="" label="Select qualification" />
                    <option value="High School" label="High School" />
                    <option value="Bachelor's" label="Bachelor's" />
                    <option value="Master's" label="Master's" />
                    <option value="PhD" label="PhD" />
                  </select>
                )}
              />
              {errors.highestQualification && <div className="text-red-500 text-sm">{errors.highestQualification.message}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Field of Study</label>
              <Controller
                name="fieldOfStudy"
                control={control}
                render={({ field }) => (
                  <input type="text" {...field} className="mt-1 p-2 w-full border rounded-md" />
                )}
              />
              {errors.fieldOfStudy && <div className="text-red-500 text-sm">{errors.fieldOfStudy.message}</div>}
            </div>
          </div>
        )}
        {additionalQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">{question.label}</label>
            <input
              type={question.type}
              name={`additionalQuestion${index}`}
              onChange={(e) => setValue(`additionalQuestion${index}`, e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700">Feedback</label>
          <Controller
            name="feedback"
            control={control}
            render={({ field }) => (
              <textarea {...field} className="mt-1 p-2 w-full border rounded-md" />
            )}
          />
          {errors.feedback && <div className="text-red-500 text-sm">{errors.feedback.message}</div>}
        </div>

        

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
