package br.com.msitec.teste.react.serializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@JsonComponent
public class SortJsonDeserializer  extends JsonDeserializer<Sort> {

	@Override
	public Sort deserialize(JsonParser jp, DeserializationContext ctxt)
	        throws IOException, JsonProcessingException {
	    ObjectNode node = jp.getCodec().readTree(jp);
	    List<Order> orders = new ArrayList<Order>();
	    for(JsonNode obj : node.get("orders")){
	    	orders.add(new Order(Direction.valueOf(obj.get("direction").asText()), obj.get("property").asText()));
	    }
	    Sort sort = Sort.by(orders);
	    return sort;
	}
}