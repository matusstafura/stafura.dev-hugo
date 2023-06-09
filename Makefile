.PHONY: install
install:
	git submodule update --init --recursive
.PHONY: update
update:
	git submodule update --recursive --remote
