import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI('AIzaSyDU6doWI0hoOy2Ape4E9HpBRS_o-E_XOMY');

// Function to get movie recommendations
export const getMovieRecommendations = async (watchlist) => {
  try {
    // Get the model - updated to use the current API version
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro" // Updated model name
    });
    
    // Extract just the essential movie data to send in the prompt
    const movieData = watchlist.map(movie => ({
      title: movie.title,
      genre: movie.genre_ids ? movie.genre_ids[0] : 'unknown',
      rating: movie.vote_average
    }));
    
    // Create a structured prompt based on the user's watchlist
    const prompt = `Based on these movies in the user's watchlist: 
${JSON.stringify(movieData, null, 2)}

Please recommend 5 similar movies. For each movie, provide:
- Title
- Brief reason why it's recommended based on the user's preferences
- Confidence score (0-100)

Return ONLY a valid JSON response in exactly this format:
{
  "recommendations": [
    {
      "title": "Movie Title",
      "reason": "Short reason for recommendation",
      "confidence": 85
    }
  ]
}`;

    // Generate content with proper error handling
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Try to parse the JSON response with error handling
    try {
      // Find the JSON part of the response (in case there's additional text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      
      const parsedResponse = JSON.parse(jsonString);
      
      // Verify the response has the expected structure
      if (!parsedResponse.recommendations || !Array.isArray(parsedResponse.recommendations)) {
        throw new Error("Invalid response format");
      }
      
      // Ensure all recommendations have the required fields
      parsedResponse.recommendations = parsedResponse.recommendations.map(rec => ({
        title: rec.title || "Unknown title",
        reason: rec.reason || "Similar to your taste in movies",
        confidence: typeof rec.confidence === 'number' ? rec.confidence : 80
      }));
      
      return parsedResponse;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.log("Raw response:", text);
      
      // Fallback response if parsing fails
      return {
        recommendations: [
          {
            title: "Parsing Error",
            reason: "We couldn't process the AI recommendations. Please try again.",
            confidence: 0
          }
        ]
      };
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { 
      recommendations: [
        {
          title: "API Error",
          reason: error.message || "We couldn't connect to our recommendation service. Please try again later.",
          confidence: 0
        }
      ] 
    };
  }
};

