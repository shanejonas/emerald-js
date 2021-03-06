// @flow
import assert from '../assert';
import type { IVaultProvider, Account } from './types';

export default class Vault {
    provider: IVaultProvider;

    constructor(provider: IVaultProvider) {
      this.provider = provider;
    }

    /**
     * Returns the list of all not hidden (by default) accounts from the keystore.
     * @param chain - chain name
     * @param showHidden - also show hidden accounts
     * @returns {*}
     */
    listAccounts(chain: string, showHidden: boolean = false): Promise<Array<Account>> {
      this.notNull(chain, 'chain');
      return this.provider.listAccounts(chain, showHidden);
    }

    signTransaction(tx, passphrase: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.provider.signTransaction(tx, passphrase, chain);
    }

    importAccount(data, chain: string) {
      this.notNull(chain, 'chain');
      return this.provider.importAccount(data, chain);
    }

    hideAccount(address: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.provider.hideAccount(address, chain);
    }

    exportAccount(address: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.provider.exportAccount(address, chain);
    }

    updateAccount(address: string, name: string, description: string = '', chain: string) {
      this.notNull(chain, 'chain');
      return this.provider.updateAccount(address, name, description, chain);
    }

    newAccount(passphrase: string, name: string, description: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.provider.newAccount(passphrase, name, description, chain);
    }

    addContract(address: string, name: string, chain: string): Promise<string> {
      this.notNull(chain, 'chain');
      return Promise.resolve(address);
      // TODO: return this.rpc.call('emerald_addContract', [{address, name }]);
    }

    notNull(value: any, param: string) {
      return assert.assert(value, `${param} must not be null`);
    }
}
