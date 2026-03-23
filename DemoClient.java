import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.SecureRandom;
import java.util.Base64;

public class DemoClient {
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/GCM/NoPadding";
    private static final int GCM_IV_LENGTH = 12;
    private static final int GCM_TAG_LENGTH = 128; // in bits
    private static final byte[] SECRET_KEY = "ThisIsASecretKeyForAES256Encrypt".getBytes();

    public static void main(String[] args) throws Exception {
        System.out.println("--- E2EE Flight Booking Demo Client ---");
        
        // 1. Get All Flights
        System.out.println("\n[1] Fetching all flights...");
        String encryptedFlights = sendGetRequest("http://localhost:8080/api/v1/flights");
        System.out.println("Encrypted Response: " + encryptedFlights);
        String flightsJson = decrypt(encryptedFlights);
        System.out.println("Decrypted Flights: \n" + flightsJson);

        // 2. Book a Flight
        System.out.println("\n[2] Booking a flight (Flight ID 1)...");
        String bookingRequestJson = "{\"flightId\":1, \"passengerName\":\"John Doe\"}";
        System.out.println("Plain Request: " + bookingRequestJson);
        String encryptedBookingPayload = encrypt(bookingRequestJson);
        System.out.println("Encrypted Request: " + encryptedBookingPayload);
        
        String encryptedBookingResponse = sendPostRequest("http://localhost:8080/api/v1/book", encryptedBookingPayload);
        String bookingResponseJson = decrypt(encryptedBookingResponse);
        System.out.println("Decrypted Response: \n" + bookingResponseJson);
        
        // Extract PNR rudimentarily
        String pnr = bookingResponseJson.split("\"pnr\":\"")[1].split("\"")[0];
        System.out.println("Extracted PNR: " + pnr);

        // 3. Cancel the Flight
        System.out.println("\n[3] Cancelling flight with PNR: " + pnr);
        String cancelRequestJson = "{\"pnr\":\"" + pnr + "\"}";
        String encryptedCancelPayload = encrypt(cancelRequestJson);
        String encryptedCancelResponse = sendPostRequest("http://localhost:8080/api/v1/cancel", encryptedCancelPayload);
        String cancelResponseJson = decrypt(encryptedCancelResponse);
        System.out.println("Decrypted Response: \n" + cancelResponseJson);
    }

    private static String sendGetRequest(String url) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("GET " + url + " - Status: " + response.statusCode());
        return extractPayload(response.body());
    }

    private static String sendPostRequest(String url, String encryptedPayload) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonBody = "{\"payload\":\"" + encryptedPayload + "\"}";
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("POST " + url + " - Status: " + response.statusCode());
        return extractPayload(response.body());
    }

    private static String extractPayload(String jsonResponse) {
        System.out.println("Raw Server Response: " + jsonResponse);
        try {
            return jsonResponse.split("\"payload\":\"")[1].split("\"")[0];
        } catch (Exception e) {
            System.err.println("Failed to parse json: " + jsonResponse);
            return "";
        }
    }

    public static String encrypt(String plainText) throws Exception {
        byte[] iv = new byte[GCM_IV_LENGTH];
        new SecureRandom().nextBytes(iv);

        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY, ALGORITHM);
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmParameterSpec);
        
        byte[] cipherText = cipher.doFinal(plainText.getBytes("UTF-8"));
        
        byte[] ivAndCipherText = new byte[iv.length + cipherText.length];
        System.arraycopy(iv, 0, ivAndCipherText, 0, iv.length);
        System.arraycopy(cipherText, 0, ivAndCipherText, iv.length, cipherText.length);
        
        return Base64.getEncoder().encodeToString(ivAndCipherText);
    }

    public static String decrypt(String base64CipherText) throws Exception {
        byte[] decoded = Base64.getDecoder().decode(base64CipherText);
        
        byte[] iv = new byte[GCM_IV_LENGTH];
        System.arraycopy(decoded, 0, iv, 0, iv.length);

        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY, ALGORITHM);
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        
        cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmParameterSpec);
        
        byte[] cipherText = new byte[decoded.length - GCM_IV_LENGTH];
        System.arraycopy(decoded, GCM_IV_LENGTH, cipherText, 0, cipherText.length);
        
        byte[] plainText = cipher.doFinal(cipherText);
        
        return new String(plainText, "UTF-8");
    }
}
