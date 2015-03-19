
test: lint
	@NODE_ENV=test ./node_modules/.bin/mocha

lint:
	@ find . -name "*.js" \
		-not -path "./node_modules/*" \
		-not -path "./test/*" \
		-not -path "./coverage/*" -print0 | \
		xargs -0 ./node_modules/jshint/bin/jshint

test-cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha

open-cov:
	open coverage/lcov-report/index.html

test-travis: lint
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--bail

.PHONY: test test-cov open-cov test-travis lint
