package br.com.msitec.teste.react.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.node.ArrayNode;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Sort;

import java.io.IOException;

@JsonComponent
public class SortJsonDeserializer extends JsonDeserializer<Sort> {

	@Override
	public Sort deserialize(JsonParser jp, DeserializationContext ctxt)
	        throws IOException, JsonProcessingException {
		System.out.println("ESTOU AQUI!!!!!!");
	    ArrayNode node = jp.getCodec().readTree(jp);
	    Order[] orders = new Order[node.size()];
	    int i = 0;
	    for(JsonNode obj : node){
	        orders[i] =  new Order(Direction.valueOf(obj.get("direction").asText()), obj.get("property").asText());
	        i++;
	    }
	    Sort sort = new Sort(orders);
	    return sort;
	}
   
    
    @Override
    public Class<Sort> handledType() {
        return Sort.class;
    }
}