import { GoogleGenerativeAI } from "@google/generative-ai"

interface CarInfo {
  year?: string
  make?: string
  model?: string
  vin?: string
}

// This is a mock implementation since we'll need a real API key to use Gemini
// In a real implementation, this would use a proper API key stored in environment variables
export const generateCarResponse = async (
  prompt: string,
  carInfo?: CarInfo
): Promise<string> => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Real implementation would use:
    // const response = await google.run(text.generate({
    //   model: 'models/gemini-1.5-pro',
    //   prompt: `You are a helpful car expert assistant. Be concise and clear. User query: ${prompt}`,
    //   maxTokens: 1000,
    // }));
    // return response.value;

    const genAI = new GoogleGenerativeAI(
      {key}
    )

    // Create a context string with car information if available
    const carContext = carInfo
      ? `This is about a ${carInfo.year || ""} ${carInfo.make || ""} ${
          carInfo.model || ""
        } ${carInfo.vin ? `(VIN: ${carInfo.vin})` : ""}. `
      : ""

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        "Act as an auto mechanic advisor for your typical car owner who knows almost nothing about cars. The car owner will give you the year, make, and model of their car, and describe the issue that they are having or something they would like to know. They might also provide an OBD code for their car. Format your response in markdown with the following sections:\n\n" +
        "## Emergency Status\n" +
        "Indicate if their problem is an emergency or urgent, or if it is a safety risk and they need to get it fixed right away.\n\n" +
        "## Cost Estimation\n" +
        "Provide a cost estimation for the fix.\n\n" +
        "## DIY vs Professional\n" +
        "Indicate if the problem can be fixed on their own or if they should take it to a mechanic (assume that the user has no specialty skillset).\n\n" +
        "## DIY Risk Assessment\n" +
        "Describe the risk of fixing it themselves.\n\n" +
        "## Long-term Impact\n" +
        "Explain the long-term costs and risks associated if they do not take the vehicle to get fixed.\n\n" +
        "## OBD Code Analysis (if applicable)\n" +
        "If an OBD code is provided, identify if the code is associated with a problem in the chassis, powertrain, electrical, body and paint, or general issue.\n\n" +
        "Use appropriate markdown formatting like **bold** for important points and `code` for technical terms.",
    })

    const result = await model.generateContent(carContext + prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error generating response:", error)
    return "I'm sorry, I couldn't process your request at the moment. Please try again later."
  }
}
