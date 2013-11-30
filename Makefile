
SRC = $(wildcard lib/*.js)

build: components $(SRC)
	@component build --dev

midi.js: components
	@component build --standalone midi --name midi --out .

components: component.json
	@component install --dev

clean:
	rm -fr build components

test: build
	open test/index.html

.PHONY: clean reactive.js test