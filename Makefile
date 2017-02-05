run_dev:
	bash -c "NODE_ENV='development' PORT=3002 node ./app/"
test:
	bash -c "npm link ."
	bash -c "nodeus newproject test"
	bash -c "cd test"
	bash -c "node test/command startserver"
clean:
	bash -c "rm -rf test"

build: clean test